import { getCustomRepository } from "typeorm"
import { TagsRepository } from "../repository/TagsRepository"

interface ITagRequest {
  name: string
}

class CreateTagService {

  async execute({name} : ITagRequest) {
    const tagsRepository = getCustomRepository(TagsRepository)

    if (!name) {
      throw new Error("Incorrect name")
    }

    const tagAlreadExists = await tagsRepository.findOne({name})
    if (tagAlreadExists) {    
      throw new Error("Tag alread exists");
    }

    const tag = tagsRepository.create({name})
    await tagsRepository.save(tag)
    return tag
  }
}

export { CreateTagService }