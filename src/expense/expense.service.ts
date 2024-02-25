import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './schema/expense.schema';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';
import { QueryParamsDto } from './dto/query-params.dto';



@Injectable()
export class ExpenseService implements OnModuleInit {
  async onModuleInit() {
    const count = await this.expenseModel.countDocuments();
    if(count===0){
      const expenseToInsert = []
      for(let i = 0; i< 15000; i++){
        const expense : Expense = {
          name: faker.person.firstName(),
          cost: faker.number.int({min: 0, max: 100}),
          product: faker.commerce.product()
        }
        expenseToInsert.push(expense)
      }
      this.expenseModel.insertMany(expenseToInsert)
    }
  }

  constructor(@InjectModel(Expense.name) private expenseModel: Model <Expense>){}

  create(createExpenseDto: CreateExpenseDto) {
    return 'This action adds a new expense';
  }

  findAll(queryParams: QueryParamsDto) {
    const page = queryParams.page ? parseInt(queryParams.page) : 1;
    const limit = queryParams.perPage ? parseInt(queryParams.perPage) : 10;
    return this.expenseModel
    .find()
    .where('cost', {$gt:50})
    .skip((page - 1) * limit)
    .limit(limit);
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }

  
  async costDocument(): Promise<number> {
    const count = await this.expenseModel.countDocuments({ cost: { $gt: 50 } });
    return count;
  }
}

