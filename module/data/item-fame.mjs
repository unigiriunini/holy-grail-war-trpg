import HolyGrailWarTRPGItemBase from "./base-item.mjs";

export default class HolyGrailWarTRPGFame extends HolyGrailWarTRPGItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.level = new fields.StringField({ required: true, blank: true });
    schema.insight_difficulty = new fields.NumberField({ required: true, nullable: false, initial: 0 });
    schema.battlefield_placement_point = new fields.NumberField({ required: true, nullable: false, initial: 0 });

    return schema;
  }

}
