export class Attendee {
    id: string;
    first_name: string;
    last_name: string;
    company: string;
    title: string;
    email: string;
    phone: string;
    registerdate: string;
    badgeid: string;
    event: string;

    constructor(firstname: string, lastname: string, company: string, title: string, email: string, phone: string) {
        this.first_name = firstname;
        this.last_name = lastname;
        this.company = company;
        this.title = title;
        this.email = email;
        this.phone = phone;
    }
}
