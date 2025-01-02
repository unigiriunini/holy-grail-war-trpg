import HolyGrailWarTRPGItemBase from "./base-item.mjs";

export default class HolyGrailWarTRPGHolyGrailFragment extends HolyGrailWarTRPGItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.name = new fields.StringField({ required: true, blank: true });
    schema.description = new fields.StringField({ required: true, blank: true });
    schema.consumed = new fields.BooleanField({ required: true, nullable: false, initial: false });

    return schema;
  }

}
