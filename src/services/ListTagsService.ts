import { getCustomRepository } from "typeorm"
import { TagsRepository } from "../repository/TagsRepository"
import { classToPlain } from "class-transformer"
import { Tag } from "../entity/Tag"

class ListTagsService {
  async execute() {
    const tagsRepository = getCustomRepository(TagsRepository)
    let tags = await tagsRepository.find()
    // tags = tags.map((tag) => ({...tag, nameCustom: `#${tag.name}`}))
    
    return classToPlain<Tag>(tags) 
  }
}

export { ListTagsService }