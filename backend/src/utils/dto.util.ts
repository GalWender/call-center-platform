import { ObjectId } from 'mongodb';

export function mapId<Doc extends { _id?: ObjectId }, Dto extends { _id: string }>(doc: Doc) {
  return { ...doc, _id: doc._id?.toHexString() ?? '' } as unknown as Dto;
}
