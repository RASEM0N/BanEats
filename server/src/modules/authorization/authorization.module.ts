import { Module } from '@nestjs/common';
import { AuthorizationService } from '@/modules/authorization/authorization.service';

@Module({
	providers: [AuthorizationService],
})
export class AuthorizationModule {}
