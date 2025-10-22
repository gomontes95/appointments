const localStorageHandler = {
    keyName: 'patients',
    getPatientList() {
        let data = [];
        if (localStorage.getItem(this.keyName)) {
            data = JSON.parse(localStorage.getItem(this.keyName));
        }
        return data;
    },
    storePatient: function(patientObject) {
        let data = this.getPatientList();

        data.push(patientObject);

        localStorage.removeItem(this.keyName);
        localStorage.setItem(this.keyName, JSON.stringify(data));
    },
    updatePatient: function(patientUpdated, position) {
        if (!Object.keys(patientUpdated).length) {
            throw new Error('Error missing properties');
        }

        let data = this.getPatientList();
        if (!data.length) {
            throw new Error('The list of patients is empty!');
        }

        data[position] = {
            ...patientUpdated,
        }

        localStorage.removeItem(this.keyName);
        localStorage.setItem(this.keyName, JSON.stringify(data));
    }
}