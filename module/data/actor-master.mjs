import HolyGrailWarTRPGActorBase from "./base-actor.mjs";

export default class HolyGrailWarTRPGMaster extends HolyGrailWarTRPGActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.name = new fields.StringField({ required: true, blank: true });
    schema.fame = new fields.StringField({ required: true, blank: true });
    schema.wish = new fields.StringField({ required: true, blank: true });

    return schema;
  }

}
