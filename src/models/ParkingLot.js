export class ParkingLot {
  constructor(id, name, totalSpaces, location) {
    this.id = id;
    this.name = name;
    this.totalSpaces = totalSpaces;
    this.availableSpaces = totalSpaces;
    this.location = location;
    this.parkingSpaces = Array.from({ length: totalSpaces }, (_, i) => ({
      id: `${i + 1}`,
      number: `A${i + 1}`,
      isOccupied: false
    }));
  }

  static fromFirestore(doc) {
    const data = doc.data();
    return new ParkingLot(
      doc.id,
      data.name,
      data.totalSpaces,
      data.location
    );
  }

  toFirestore() {
    return {
      name: this.name,
      totalSpaces: this.totalSpaces,
      availableSpaces: this.availableSpaces,
      location: this.location,
      parkingSpaces: this.parkingSpaces
    };
  }

  findAvailableSpace() {
    const space = this.parkingSpaces.find(space => !space.isOccupied);
    return space || null;
  }

  updateSpaceStatus(spaceId, isOccupied) {
    const space = this.parkingSpaces.find(s => s.id === spaceId);
    if (space) {
      space.isOccupied = isOccupied;
      this.availableSpaces = this.parkingSpaces.filter(s => !s.isOccupied).length;
    }
  }

  calculateOccupancyRate() {
    return (this.totalSpaces - this.availableSpaces) / this.totalSpaces;
  }
} 