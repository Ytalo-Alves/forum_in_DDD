import { UniqueEntitiesID } from './unique-entities-id'

export class Entity<Props> {
  private _id: UniqueEntitiesID

  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: UniqueEntitiesID) {
    this.props = props
    this._id = id ?? new UniqueEntitiesID()
  }
}
