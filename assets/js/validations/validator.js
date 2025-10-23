const validator = {
  validateAppointment(value) {
    this.validateValueNotNull({ propertyName: 'appointment', value });

    return this.validateValueNotEmpty({ propertyName: 'appointment', value });
  },
  validateBirthday(value) {
    this.validateValueNotNull({ propertyName: 'birthday', value });

    this.validateValueNotEmpty({ propertyName: 'birthday', value });

    const birthdayCasted = new Date(value);

    if (birthdayCasted instanceof Date && Number.isNaN(birthdayCasted)) {
      throw new Error('❌ The birthday value is not valid Date');
    }

    const today = new Date();
    if (birthdayCasted > today) {
      throw new Error('❌ The birthday cannot be a future day!');
    }

    if (birthdayCasted.getFullYear() < 1900) {
      throw new Error('❌ The birthday must be after the 1900');
    }

    return true;
  },
  validateHeight(value) {
    const parameters = { propertyName: 'height', value };
    this.validateValueNotNull(parameters);

    this.validateValueNotEmpty(parameters);

    return this.validateIsNumber(parameters);
  },
  validateName: function ( value ) {
    this.validateValueNotNull({ propertyName: 'name', value });

    this.validateValueNotEmpty({ propertyName: 'name', value });

    if (!(/^[\p{Lu}\p{Ll}]+([ '-][\p{Lu}\p{Ll}]+)*$/u.test(value))) {
      throw new Error('❌ The name should not have numbers, only letters');
    }

    return true;
  },
  validateWeight(value) {
    const parameters = { propertyName: 'weight', value };
    this.validateValueNotNull(parameters);

    this.validateValueNotEmpty(parameters);

    return this.validateIsNumber(parameters);
  },
  validateValueNotNull({ propertyName, value }) {
    if (value === null) {
      throw new Error(`❌ The ${propertyName} is null`);
    }
    return true;
  },
  validateValueNotEmpty({ propertyName, value }) {
    if (value.toString().trim() === '') {
      throw new Error(`❌ The ${propertyName} is empty`);
    }
    return true;
  },
  validateIsNumber({ propertyName, value }) {
    if (!/^\d+(\.\d+)?$/.test(value.trim())) {
      throw new Error(`❌ The ${propertyName} is not a number`);
    }
    return true;
  },
}
