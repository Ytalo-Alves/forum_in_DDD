import { Entity } from "@/core/entities/entity";
import type { UniqueEntitiesID } from "@/core/entities/unique-entities-id";

interface AttachmentProps {
  title: string
  link: string

}

export class Attachment extends Entity<AttachmentProps>{
  get title() {
    return this.props.title
  }

  get link () {
    return this.props.link
  }

  static create(props: AttachmentProps, id?: UniqueEntitiesID) {
    const attachment = new Attachment(props, id)

    return attachment
  }
}