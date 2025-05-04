import { Entity } from "@/core/entities/entity"
import type { UniqueEntitiesID } from "@/core/entities/unique-entities-id"


interface InstructorProps {
  name: string
}

export class Instructor extends Entity<InstructorProps> {
  static create(props: InstructorProps, id?: UniqueEntitiesID) {
    const instructor = new Instructor(props, id)

    return instructor
  }
}
