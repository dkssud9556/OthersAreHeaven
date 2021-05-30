import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReportDocument = Report & Document;

@Schema()
export class Report {
  @Prop({ required: true })
  roomId: string;

  @Prop({ required: true })
  suspectEmail: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
