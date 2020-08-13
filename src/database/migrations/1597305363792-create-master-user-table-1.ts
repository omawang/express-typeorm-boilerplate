import {MigrationInterface, QueryRunner} from "typeorm";

export class createMasterUserTable11597305363792 implements MigrationInterface {
    name = 'createMasterUserTable11597305363792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "master"."users" ("id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "profession" character varying NOT NULL, "avatar" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "pin" character varying NOT NULL, "is_agent" boolean NOT NULL DEFAULT false, "agent_verified_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_b9bc39f45aacb7ade2449c92fca" UNIQUE ("phone"), CONSTRAINT "UQ_e54f163f206939ba0a65fd6920a" UNIQUE ("email"), CONSTRAINT "PK_433af2c3a4b1d44f0e7e86ae994" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "master"."refresh_tokens" ("id" BIGSERIAL NOT NULL, "user_id" bigint NOT NULL, "token" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_068f0ca703b65d59303989e88a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "master"."refresh_tokens" ADD CONSTRAINT "FK_5aa42a9fe3dbc50b400a7b0deb0" FOREIGN KEY ("user_id") REFERENCES "master"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "master"."refresh_tokens" DROP CONSTRAINT "FK_5aa42a9fe3dbc50b400a7b0deb0"`);
        await queryRunner.query(`DROP TABLE "master"."refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "master"."users"`);
    }

}
