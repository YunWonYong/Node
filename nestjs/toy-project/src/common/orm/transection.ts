import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, QueryRunner } from "typeorm";

type TransactionDoParams<T> = {
    prevJob?: (queryRunner: QueryRunner) => Promise<T>,
    mainJob: (queryRunner: QueryRunner, prevArgs?: T) => Promise<void>
}

@Injectable()
class TransactionService {
    @InjectDataSource()
    private readonly dataSource: DataSource;

    public async do<T>(param: TransactionDoParams<T>) {
        const queryRunner = this.dataSource.createQueryRunner();
        if (!queryRunner) {
            throw new Error("queryRunner NotFound");
        }      

        let transactionStartFlag = false;
        try {
            await queryRunner.connect();

            const { prevJob, mainJob } = param;
            let prevJobResult: T | undefined;

            if (prevJob) {
                prevJobResult = await prevJob(queryRunner);
            }
            await queryRunner.startTransaction();

            transactionStartFlag = true;

            await mainJob(queryRunner, prevJobResult);

            await queryRunner.commitTransaction();
        } catch(e) {
            if (transactionStartFlag) {
                await queryRunner.rollbackTransaction();
            }
            throw e;
        } finally {
            if (queryRunner) {
                await queryRunner.release();
            }
        }
    }
}


export default TransactionService;