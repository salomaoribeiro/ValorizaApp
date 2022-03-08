import { Tag } from "../entity/Tag"
import { EntityRepository, Repository } from "typeorm"

@EntityRepository(Tag)
class TagsRepository extends Repository<Tag> {

}

export { TagsRepository }