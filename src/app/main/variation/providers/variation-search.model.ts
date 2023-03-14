import { fromUnixTime, subDays } from 'date-fns';

export class VariationSearchModel {
  identifier?: string;

  type: 'date' | 'group' = 'group';

  group: '5D' | '1M' | '3M' | '6M' = '1M';

  startDate?: number | null;

  endDate?: number | null;

  handledStartDate?: Date;

  handledEndDate?: Date;

  constructor(data: any) {
    if (!data) return;
    this.identifier = data?.identifier;
    this.type = data?.type ?? this.type;
    this.group = data?.group ?? this.group;
    if (data?.startDate && data?.startDate instanceof Date) {
      const start = new Date(data?.startDate);
      const end = new Date(data?.endDate);
      this.startDate = Math.floor(start.getTime() / 1000);
      this.endDate = Math.floor(end.getTime() / 1000);
    } else {
      this.startDate = data?.startDate ?? this.startDate;
      this.endDate = data?.endDate ?? this.endDate;
    }
    if (this.startDate && this.endDate) {
      this.handledStartDate = fromUnixTime(this.startDate);
      this.handledEndDate = fromUnixTime(this.endDate);
    }
  }

  public getUrlParams() {
    const { identifier, startDate, endDate, group } = this;
    let handledStartDate = startDate;
    let handledEndDate = endDate;

    if (!handledStartDate) {
      const handlePeriod = (days: number) => {
        const dt = subDays(new Date(), days);
        return Math.floor(dt.getTime() / 1000);
      };

      const days = {
        '5D': 5,
        '1M': 30,
        '3M': 90,
        '6M': 180
      }[group];

      handledStartDate = handlePeriod(days);
      handledEndDate = handlePeriod(0);
    }

    let url = `?symbol=${identifier}`;
    url = `${url}&period1=${handledStartDate}&period2=${handledEndDate}`;
    url = `${url}&useYfid=true&interval=1d&includePrePost=true&events=div%7Csplit%7Cearn`;
    return `${url}&corsDomain=finance.yahoo.com`;
  }

  public toJSON() {
    const { type, group, startDate, endDate } = this;

    return {
      type,
      group,
      startDate,
      endDate
    };
  }
}
