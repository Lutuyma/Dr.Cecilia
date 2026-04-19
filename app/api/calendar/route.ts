import { NextResponse } from 'next/server';
import { google } from 'googleapis';

/**
 * Helper to initialize the Google Auth client using OAuth2.
 */
const getAuthClient = () => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  return oAuth2Client;
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get('date');
    if (!dateParam) {
      return NextResponse.json({ error: 'Missing date parameter' }, { status: 400 });
    }

    const auth = getAuthClient();
    const calendar = google.calendar({ version: 'v3', auth });

    const timeMin = new Date(dateParam);
    timeMin.setHours(9, 0, 0, 0); // Start of day 9h

    const timeMax = new Date(dateParam);
    timeMax.setHours(16, 0, 0, 0); // End of day 16h

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        timeZone: 'Europe/Lisbon',
        items: [{ id: process.env.GOOGLE_CALENDAR_ID || 'cecilia-antonio@hotmail.com' }],
      },
    });

    const busy = response.data.calendars?.[process.env.GOOGLE_CALENDAR_ID || 'cecilia-antonio@hotmail.com']?.busy || [];

    return NextResponse.json({ success: true, busy });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { date, name, email, area, message } = body;

    if (!date || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const auth = getAuthClient();
    const calendar = google.calendar({ version: 'v3', auth });

    const startTime = new Date(date);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour duration

    const event = {
      summary: `Consulta Jurídica - ${name}`,
      description: `Agendamento efetuado via website.\n\nCliente: ${name}\nContacto: ${email}\nÁrea: ${area || 'Não especificada'}\nMensagem: ${message || 'Sem mensagem'}`,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: 'Europe/Lisbon',
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'Europe/Lisbon',
      },
      attendees: [
        { email } // The client gets an invitation automatically from Google Calendar if sent
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 1440 },
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'cecilia-antonio@hotmail.com',
      requestBody: event,
      sendUpdates: 'all', // Send email notifications to attendees
    });

    return NextResponse.json({ success: true, eventId: response.data.id });
  } catch (error) {
    console.error('Error creating Google Calendar event:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
