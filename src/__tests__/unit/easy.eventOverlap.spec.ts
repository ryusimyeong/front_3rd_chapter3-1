import { Event } from '../../types';
import {
  convertEventToDateRange,
  findOverlappingEvents,
  isOverlapping,
  parseDateTime,
} from '../../utils/eventOverlap';

describe('parseDateTime', () => {
  it('2024-07-01 14:30을 정확한 Date 객체로 변환한다', () => {
    const dateTime = parseDateTime('2024-07-01', '14:30');

    expect(dateTime).toEqual(new Date('2024-07-01 14:30:00'));
  });

  it('잘못된 날짜 형식에 대해 Invalid Date를 반환한다', () => {
    const dateTime = parseDateTime('2024-07-3a', '14:30');

    expect(dateTime).toEqual(new Date('Invalid Date'));
  });

  it('잘못된 시간 형식에 대해 Invalid Date를 반환한다', () => {
    const dateTime = parseDateTime('2024-07-3a', '14:3c');

    expect(dateTime).toEqual(new Date('Invalid Date'));
  });

  it('날짜 문자열이 비어있을 때 Invalid Date를 반환한다', () => {
    const dateTime = parseDateTime('', '14:3c');

    expect(dateTime).toEqual(new Date('Invalid Date'));
  });
});

describe('convertEventToDateRange', () => {
  it('일반적인 이벤트를 올바른 시작 및 종료 시간을 가진 객체로 변환한다', () => {
    const event: Event = {
      id: '1adf',
      title: 'Test Event',
      date: '2024-07-01',
      startTime: '14:30',
      endTime: '15:30',
      description: 'Test Description',
      location: 'Test Location',
      category: 'Test Category',
      repeat: {
        type: 'none',
        interval: 1,
      },
      notificationTime: 10,
    };

    const dateRange = convertEventToDateRange(event);

    expect(dateRange).toEqual({
      start: new Date('2024-07-01 14:30'),
      end: new Date('2024-07-01 15:30'),
    });
  });

  it('잘못된 날짜 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const event: Event = {
      id: '1adf',
      title: 'Test Event',
      date: '2024-07-43',
      startTime: '14:30',
      endTime: '15:30',
      description: 'Test Description',
      location: 'Test Location',
      category: 'Test Category',
      repeat: {
        type: 'none',
        interval: 1,
      },
      notificationTime: 10,
    };

    const dateRange = convertEventToDateRange(event);

    expect(dateRange).toEqual({
      start: new Date('Invalid Date'),
      end: new Date('Invalid Date'),
    });
  });

  it('잘못된 시간 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const event: Event = {
      id: '1adf',
      title: 'Test Event',
      date: '2024-07-01',
      startTime: '28:30',
      endTime: '32:30',
      description: 'Test Description',
      location: 'Test Location',
      category: 'Test Category',
      repeat: {
        type: 'none',
        interval: 1,
      },
      notificationTime: 10,
    };

    const dateRange = convertEventToDateRange(event);

    expect(dateRange).toEqual({
      start: new Date('Invalid Date'),
      end: new Date('Invalid Date'),
    });
  });
});

describe('isOverlapping', () => {
  it('두 이벤트가 겹치는 경우 true를 반환한다', () => {
    const event1: Event = {
      id: '1',
      title: 'Test Event 1',
      date: '2024-07-01',
      startTime: '14:30',
      endTime: '15:30',
      description: 'Test Description',
      location: 'Test Location',
      category: 'Test Category',
      repeat: {
        type: 'none',
        interval: 1,
      },
      notificationTime: 10,
    };

    const event2: Event = {
      id: '2',
      title: 'Test Event 2',
      date: '2024-07-01',
      startTime: '15:00',
      endTime: '16:00',
      description: 'Test Description',
      location: 'Test Location',
      category: 'Test Category',
      repeat: {
        type: 'none',
        interval: 1,
      },
      notificationTime: 10,
    };

    const result = isOverlapping(event1, event2);

    expect(result).toBe(true);
  });

  it('두 이벤트가 겹치지 않는 경우 false를 반환한다', () => {
    const event1: Event = {
      id: '1',
      title: 'Test Event 1',
      date: '2024-07-01',
      startTime: '14:30',
      endTime: '15:30',
      description: 'Test Description',
      location: 'Test Location',
      category: 'Test Category',
      repeat: {
        type: 'none',
        interval: 1,
      },
      notificationTime: 10,
    };

    const event2: Event = {
      id: '2',
      title: 'Test Event 2',
      date: '2024-07-01',
      startTime: '15:30',
      endTime: '16:30',
      description: 'Test Description',
      location: 'Test Location',
      category: 'Test Category',
      repeat: {
        type: 'none',
        interval: 1,
      },
      notificationTime: 10,
    };

    const result = isOverlapping(event1, event2);

    expect(result).toBe(false);
  });
});

describe('findOverlappingEvents', () => {
  it('새 이벤트와 겹치는 모든 이벤트를 반환한다', () => {
    const events: Event[] = [
      {
        id: '1',
        title: 'Test Event 1',
        date: '2024-07-01',
        startTime: '14:30',
        endTime: '15:30',
        description: 'Test Description',
        location: 'Test Location',
        category: 'Test Category',
        repeat: {
          type: 'none',
          interval: 1,
        },
        notificationTime: 10,
      },
      {
        id: '2',
        title: 'Test Event 2',
        date: '2024-07-01',
        startTime: '16:30',
        endTime: '17:30',
        description: 'Test Description',
        location: 'Test Location',
        category: 'Test Category',
        repeat: {
          type: 'none',
          interval: 1,
        },
        notificationTime: 10,
      },
    ];
    const newEvent: Event = {
      id: '3',
      title: 'Test Event 2',
      date: '2024-07-01',
      startTime: '15:00',
      endTime: '16:00',
      description: 'Test Description',
      location: 'Test Location',
      category: 'Test Category',
      repeat: {
        type: 'none',
        interval: 1,
      },
      notificationTime: 10,
    };

    const overlappedEvents = findOverlappingEvents(newEvent, events);

    expect(overlappedEvents).toEqual([
      {
        id: '1',
        title: 'Test Event 1',
        date: '2024-07-01',
        startTime: '14:30',
        endTime: '15:30',
        description: 'Test Description',
        location: 'Test Location',
        category: 'Test Category',
        repeat: {
          type: 'none',
          interval: 1,
        },
        notificationTime: 10,
      },
    ]);
  });

  it('겹치는 이벤트가 없으면 빈 배열을 반환한다', () => {
    const events: Event[] = [
      {
        id: '1',
        title: 'Test Event 1',
        date: '2024-07-01',
        startTime: '14:30',
        endTime: '15:30',
        description: 'Test Description',
        location: 'Test Location',
        category: 'Test Category',
        repeat: {
          type: 'none',
          interval: 1,
        },
        notificationTime: 10,
      },
      {
        id: '2',
        title: 'Test Event 2',
        date: '2024-07-01',
        startTime: '16:30',
        endTime: '17:30',
        description: 'Test Description',
        location: 'Test Location',
        category: 'Test Category',
        repeat: {
          type: 'none',
          interval: 1,
        },
        notificationTime: 10,
      },
    ];
    const newEvent: Event = {
      id: '3',
      title: 'Test Event 2',
      date: '2024-07-01',
      startTime: '19:00',
      endTime: '20:00',
      description: 'Test Description',
      location: 'Test Location',
      category: 'Test Category',
      repeat: {
        type: 'none',
        interval: 1,
      },
      notificationTime: 10,
    };

    const overlappedEvents = findOverlappingEvents(newEvent, events);

    expect(overlappedEvents).toEqual([]);
  });
});
