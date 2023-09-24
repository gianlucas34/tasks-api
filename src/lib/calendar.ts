import 'dotenv/config'
import { google } from 'googleapis'
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
  const existingCalendar = calendars?.find(
    (item) => item.summary === 'Tarefas - Desafio Akm'
  )
  let calendarId: string

  if (!existingCalendar) {
    const response = await googleCalendar.calendars.insert({
      requestBody: {
        summary: 'Tarefas - Desafio Akm',
      },
    })

    calendarId = response.data.id as string
  } else {
    calendarId = existingCalendar.id as string
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
    calendarId,
    requestBody: {
      id: task.id.replace(/-/gi, ''),
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

const updateEvent = async (
  task: Pick<Task, 'id' | 'title' | 'description' | 'end_date'>
) => {
  const calendarsList = await googleCalendar.calendarList.list()
  const calendars = calendarsList.data.items
  const existingCalendar = calendars?.find(
    (item) => item.summary === 'Tarefas - Desafio Akm'
  )

  const eventsList = await googleCalendar.events.list({
    calendarId: existingCalendar?.id || 'primary',
  })
  const events = eventsList.data.items
  const existingEvent = events?.find(
    (item) => item.id === task.id.replace(/-/gi, '')
  )

  await googleCalendar.events.update({
    calendarId: existingCalendar?.id || 'primary',
    eventId: existingEvent?.id || '',
    requestBody: {
      summary: task.title,
      description: task.description,
      start: {
        dateTime: existingEvent?.start?.dateTime,
        timeZone: 'America/Sao_Paulo',
      },
      end: {
        dateTime: task.end_date.toISOString(),
        timeZone: 'America/Sao_Paulo',
      },
    },
  })
}

const deleteEvent = async (taskId: string) => {
  const calendarsList = await googleCalendar.calendarList.list()
  const calendars = calendarsList.data.items
  const existingCalendar = calendars?.find(
    (item) => item.summary === 'Tarefas - Desafio Akm'
  )

  const eventsList = await googleCalendar.events.list({
    calendarId: existingCalendar?.id || 'primary',
  })
  const events = eventsList.data.items
  const existingEvent = events?.find(
    (item) => item.id === taskId.replace(/-/gi, '')
  )

  await googleCalendar.events.delete({
    calendarId: existingCalendar?.id || 'primary',
    eventId: existingEvent?.id || '',
  })
}

export const calendar = { insertEvent, updateEvent, deleteEvent }
