import { ArgsType, PickType } from '@nestjs/graphql';
import { Verification } from '../entities/verification.entity';

@ArgsType()
export class VerifyEmailArgs extends PickType(Verification, ['code'], ArgsType) {}
