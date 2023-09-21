import 'dotenv/config'
import { calendar_v3, google } from 'googleapis'
import { Task } from '../models/Task'

const oauth2Client = new google.auth.OAuth2(
  process.env.GC_CLIENT_ID,
  process.env.GC_CLIENT_SECRET
)

oauth2Client.setCredentials({ refresh_token: process.env.GC_REFRESH_TOKEN })

const googleCalendar = google.calendar({ version: 'v3', auth: oauth2Client })

const insertEvent = async (task: Task) => {
  const calendarsList = await googleCalendar.calendarList.list()
  const calendars = calendarsList.data.items
  const calendarAlreadyExists = calendars?.findIndex(
    (item) => item.summary === 'Tarefas - Desafio Akm'
  )
  let existingCalendar: calendar_v3.Schema$Calendar | undefined

  if (calendarAlreadyExists === -1) {
    const response = await googleCalendar.calendars.insert({
      requestBody: {
        summary: 'Tarefas - Desafio Akm',
      },
    })

    existingCalendar = response.data
  }

  const d = new Date()
  const date = new Date(
    Date.UTC(
      d.getUTCFullYear(),
      d.getUTCMonth(),
      d.getUTCDate(),
      d.getUTCHours(),
      d.getUTCMinutes(),
      d.getUTCSeconds()
    )
  )

  await googleCalendar.events.insert({
    calendarId: existingCalendar?.id || 'primary',
    requestBody: {
      summary: task.title,
      description: task.description,
      start: {
        dateTime: date.toISOString(),
        timeZone: 'America/Sao_Paulo',
      },
      end: {
        dateTime: task.end_date.toISOString(),
        timeZone: 'America/Sao_Paulo',
      },
    },
  })
}

export const calendar = { insertEvent }
