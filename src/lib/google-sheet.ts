import { google } from 'googleapis';

import { ENVIRONMENTS } from '@/config/enviroments';

const SHEET_NAME = 'Members';

export const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: ENVIRONMENTS.GOOGLE_CLIENT_EMAIL,
    private_key: ENVIRONMENTS.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

export const getUsersFromSheet = async (): Promise<Record<string, string>> => {
  const sheets = google.sheets({ version: 'v4', auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: ENVIRONMENTS.SHEET_ID,
    range: `${SHEET_NAME}!A2:B`,
  });

  const rows = response.data.values || [];
  const map: Record<string, string> = {};

  for (const row of rows) {
    const [deviceUserId, fullName] = row;
    map[deviceUserId] = fullName;
  }

  return map;
};

export const checkEmailInGoogleSheet = async (
  email: string,
): Promise<{ code: string } | null> => {
  const sheets = google.sheets({ version: 'v4', auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: ENVIRONMENTS.SHEET_ID,
    range: `${SHEET_NAME}!A2:C`,
  });

  const rows = response.data.values || [];

  for (const row of rows) {
    const code = row[0];
    const emailFromSheet = row[2];

    if (
      emailFromSheet &&
      emailFromSheet.trim().toLowerCase() === email.toLowerCase()
    ) {
      return { code };
    }
  }

  return null;
};
