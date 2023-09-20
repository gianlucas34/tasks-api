'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      'users',
      [
        {
          id: '26243fe7-6764-4299-9c32-0b88380efdbb',
          email: 'gianlucassmith34@gmail.com',
          password:
            '$2a$12$XDxwakFCnemYDPbDbQFKEOYAXA0FxVZhZWdfHEzrFm1RLkS8M2xKS',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'a7ac0adb-dbf5-4434-921d-11622988498f',
          email: 'alex.souza@akm.com.br',
          password:
            '$2a$12$XDxwakFCnemYDPbDbQFKEOYAXA0FxVZhZWdfHEzrFm1RLkS8M2xKS',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('users', null, {})
  },
}
