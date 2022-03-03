import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from "@nestjs/config";
import { configValidationSchema } from "../config.schema";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.STAGE}`],
      validationSchema: configValidationSchema
    }),
    AuthModule
  ],
})
export class AppModule {}
