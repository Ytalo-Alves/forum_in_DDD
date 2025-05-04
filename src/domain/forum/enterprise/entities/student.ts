import { Entity } from "@/core/entities/entity"
import type { UniqueEntitiesID } from "@/core/entities/unique-entities-id"


interface StudentProps {
  name: string
}

export class Student extends Entity<StudentProps> {
  static create(props: StudentProps, id?: UniqueEntitiesID) {
    const student = new Student(props, id)

    return student
  }
}
