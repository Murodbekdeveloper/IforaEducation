import { Controller, Get } from '@nestjs/common';
import { FounderService } from './founder.service';

@Controller('founder')
export class FounderController {
  constructor(private readonly founderService: FounderService) {}

  @Get()
  find() {
    return this.founderService.find();
  }
}
