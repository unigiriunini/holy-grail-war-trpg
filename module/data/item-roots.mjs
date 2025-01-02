import HolyGrailWarTRPGItemBase from "./base-item.mjs";

export default class HolyGrailWarTRPGRoots extends HolyGrailWarTRPGItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.name = new fields.StringField({ required: true, blank: true });
    schema.trait = new fields.SchemaField({
      name: new fields.StringField({ required: true, blank: true }),
      description: new fields.StringField({ required: true, blank: true })
    });

    return schema;
  }

}
