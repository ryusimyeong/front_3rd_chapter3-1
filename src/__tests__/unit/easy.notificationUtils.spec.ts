import { Event } from '../../types';
import { createNotificationMessage, getUpcomingEvents } from '../../utils/notificationUtils';

const events: Event[] = [
  {
    id: '1',
    title: '이벤트 1',
    date: '2024-11-01',
    startTime: '10:00',
    endTime: '11:00',
    notificationTime: 10,
    description: '이벤트 1 설명',
    location: '이벤트 1 장소',
    category: '이벤트 1 카테고리',
    repeat: {
      type: 'daily',
      interval: 1,
    },
  },
  {
    id: '2',
    title: '이벤트 2',
    date: '2024-11-01',
    startTime: '12:00',
    endTime: '13:00',
    notificationTime: 10,
    description: '이벤트 2 설명',
    location: '이벤트 2 장소',
    category: '이벤트 2 카테고리',
    repeat: {
      type: 'daily',
      interval: 1,
    },
  },
];

describe('getUpcomingEvents', () => {
  it('알림 시간이 정확히 도래한 이벤트를 반환한다', () => {
    const date = new Date('2024-11-01T09:50:00');
    const upcomingEvents = getUpcomingEvents(events, date, []);

    expect(upcomingEvents).toHaveLength(1);
  });

  it('이미 알림이 간 이벤트는 제외한다', () => {
    const date = new Date('2024-11-01T09:50:00');
    const upcomingEvents = getUpcomingEvents(events, date, ['1']);

    expect(upcomingEvents).toHaveLength(0);
  });

  it('알림 시간이 아직 도래하지 않은 이벤트는 반환하지 않는다', () => {
    const date = new Date('2024-11-01T10:50:00');
    const upcomingEvents = getUpcomingEvents(events, date, []);

    expect(upcomingEvents).toHaveLength(0);
  });

  it('알림 시간이 지난 이벤트는 반환하지 않는다', () => {
    const date = new Date('2024-11-01T12:00:00');
    const upcomingEvents = getUpcomingEvents(events, date, []);

    expect(upcomingEvents).toHaveLength(0);
  });
});

describe('createNotificationMessage', () => {
  it('올바른 알림 메시지를 생성해야 한다', () => {
    events.forEach((event) => {
      const message = createNotificationMessage(event);

      expect(message).toBe(`${event.notificationTime}분 후 ${event.title} 일정이 시작됩니다.`);
    });
  });
});
