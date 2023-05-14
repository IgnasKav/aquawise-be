export class CompanyClient {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    devices: Device[] = [];

    constructor(dto: any) {
        this.email = dto['email'] ?? '';
        this.phone = dto['phone'] ?? '';
        this.firstName = dto['firstName'] ?? '';
        this.lastName = dto['lastName'] ?? '';
        if (dto['userDevices'] != null) {
            for (const [key, value] of Object.entries(dto['userDevices'])) {
                this.devices.push(new Device(key, value['name'], {}));
            }
        }
    }
}

export class Device {
    mac: string;
    name: string;
    saltPercentage?: number;
    leak: boolean;

    constructor(mac: string, name: string, dto: any) {
        this.mac = mac;
        this.name = name;
        if (dto['brineTankLowerBound'] && dto['brineTankUpperBound']) {
            const lowerBound = dto['brineTankLowerBound'];
            const upperBound = dto['brineTankUpperBound'];
            const saltLevel = dto['salt'];
            this.saltPercentage =
                100 -
                ((saltLevel - upperBound) * 100) / (lowerBound - upperBound);
        }
        this.leak = dto['leak'] ?? false;
    }
}
