import { Event } from '../../types';
import { getFilteredEvents } from '../../utils/eventUtils';

describe('getFilteredEvents', () => {
  const events: Event[] = [
    {
      id: '1',
      title: '이벤트 1',
      date: '2024-11-01',
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
      title: '이벤트 2',
      date: '2024-11-01',
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
    {
      id: '3',
      title: '이벤트 3',
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
    {
      id: '4',
      title: '이벤트 4',
      date: '2024-07-08',
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
    {
      id: '5',
      title: '이벤트 5',
      date: '2024-07-15',
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
    {
      id: '6',
      title: '이벤트 6',
      date: '2024-07-31',
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
    {
      id: '7',
      title: '이벤트 7',
      date: '2024-07-30',
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
    {
      id: '8',
      title: '이벤트 8',
      date: '2024-08-01',
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

  it("검색어 '이벤트 2'에 맞는 이벤트만 반환한다", () => {
    const filteredEvents = getFilteredEvents(events, '이벤트 2', new Date('2024-11-01'), 'week');

    expect(filteredEvents).toHaveLength(1);
    expect(filteredEvents).toEqual([
      {
        id: '2',
        title: '이벤트 2',
        date: '2024-11-01',
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
    ]);
  });

  it('주간 뷰에서 2024-07-01 주의 이벤트만 반환한다', () => {
    const filteredEvents = getFilteredEvents(events, '', new Date('2024-07-01'), 'week');

    expect(filteredEvents).toHaveLength(1);
  });

  it('월간 뷰에서 2024년 7월의 모든 이벤트를 반환한다', () => {
    const filteredEvents = getFilteredEvents(events, '', new Date('2024-07-01'), 'month');

    expect(filteredEvents).toHaveLength(5);
  });

  it("검색어 '이벤트'와 주간 뷰 필터링을 동시에 적용한다", () => {
    const filteredEvents = getFilteredEvents(events, '이벤트', new Date('2024-07-01'), 'week');

    expect(filteredEvents).toHaveLength(1);
  });

  it('검색어가 대소문자를 구분하지 않고 작동한다', () => {
    const upperCaseEvents = getFilteredEvents(events, 'Test', new Date('2024-07-01'), 'month');
    const lowerCaseEvents = getFilteredEvents(events, 'test', new Date('2024-07-01'), 'month');

    expect(upperCaseEvents.length).toBe(lowerCaseEvents.length);
    expect(upperCaseEvents).toEqual(lowerCaseEvents);
  });

  it('월의 경계에 있는 이벤트를 올바르게 필터링한다.)', () => {
    const filteredEvents = getFilteredEvents(events, '', new Date('2024-08-01'), 'week');

    expect(filteredEvents.length).toBe(3);
  });

  it('빈 이벤트 리스트에 대해 빈 배열을 반환한다', () => {
    const filteredEvents = getFilteredEvents([], '', new Date('2024-08-01'), 'week');

    expect(filteredEvents).toEqual([]);
  });

  describe('검색어가 없을 때 모든 이벤트를 반환한다', () => {
    it('view가 week면 해당 주의 모든 이벤트를 반환한다', () => {
      const filteredEvents = getFilteredEvents(events, '', new Date('2024-07-01'), 'week');

      expect(filteredEvents).toHaveLength(1);
    });

    it('view가 month면 해당 월의 모든 이벤트를 반환한다', () => {
      const filteredEvents = getFilteredEvents(events, '', new Date('2024-07-01'), 'month');

      expect(filteredEvents).toHaveLength(5);
    });
  });
});
