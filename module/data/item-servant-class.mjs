import HolyGrailWarTRPGItemBase from "./base-item.mjs";

export default class HolyGrailWarTRPGServantClass extends HolyGrailWarTRPGItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.name = new fields.StringField({ required: true, blank: true });

    schema.trait = new fields.SchemaField({
      name: new fields.StringField({ required: true, blank: true }),
      description: new fields.StringField({ required: true, blank: true })
    });

    schema.lower_limit_status = new fields.SchemaField({
      strength: new fields.StringField({ required: true, blank: true }),
      constitution: new fields.StringField({ required: true, blank: true }),
      dexterity: new fields.StringField({ required: true, blank: true }),
      mana: new fields.StringField({ required: true, blank: true }),
      luck: new fields.StringField({ required: true, blank: true }),
      noble_phantasm: new fields.StringField({ required: true, blank: true })
    });

    return schema;
  }
}
