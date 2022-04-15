import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Controller('collections')
export class CollectionsController {
  private readonly logger: Logger = new Logger(CollectionsController.name);
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto): string {
    this.logger.log(`Creating collection ${createCollectionDto}`);
    return this.collectionsService.create(createCollectionDto);
  }

  @Get()
  findAll(): string {
    return this.collectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return this.collectionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollectionDto: UpdateCollectionDto): string {
    return this.collectionsService.update(+id, updateCollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return this.collectionsService.remove(+id);
  }
}
