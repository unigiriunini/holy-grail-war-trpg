import HolyGrailWarTRPGDataModel from "./base-model.mjs";

export default class HolyGrailWarTRPGItemBase extends HolyGrailWarTRPGDataModel {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = {};

    schema.description = new fields.StringField({ required: true, blank: true });

    return schema;
  }

}