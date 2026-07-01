import { CURRENCY } from '../constants/site';
export const formatMoney = (amount: number) => CURRENCY.format(amount);
