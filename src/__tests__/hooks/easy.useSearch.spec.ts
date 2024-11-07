import { act, renderHook } from '@testing-library/react';

import { useSearch } from '../../hooks/useSearch.ts';
import { Event } from '../../types.ts';

const events: Event[] = [
  {
    id: '12eqdw',
    title: '팀 회의',
    date: '2024-10-31',
    startTime: '10:00',
    endTime: '11:00',
    description: '주간 팀 미팅',
    location: '회의실 A',
    category: '업무',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 1,
  },
  {
    id: 'erfg',
    title: '점심 약속',
    date: '2024-11-01',
    startTime: '12:30',
    endTime: '13:30',
    description: '동료와 점심 식사',
    location: '회사 근처 식당',
    category: '개인',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 1,
  },
  {
    id: 'yhb',
    title: '팀 회의',
    date: '2024-11-05',
    startTime: '09:00',
    endTime: '18:00',
    description: '주간 팀 미팅',
    location: '사무실',
    category: '업무',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 1,
  },
  {
    id: 'a',
    title: '생일 파티',
    date: '2024-11-08',
    startTime: '19:00',
    endTime: '22:00',
    description: '친구 생일 축하',
    location: '친구 집',
    category: '개인',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 1,
  },
  {
    id: 'b',
    title: '팀 회의',
    date: '2024-11-29',
    startTime: '18:00',
    endTime: '19:00',
    description: '주간 팀 미팅',
    location: '헬스장',
    category: '개인',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 1,
  },
];

describe('검색어가 비어있을 때', () => {
  it('view가 week일 때 현재 주의 모든 이벤트를 반환해야 한다', () => {
    const currentDate = new Date('2024-11-01');
    const view = 'week';
    const { result } = renderHook(() => useSearch(events, currentDate, view));

    expect(result.current.filteredEvents).toHaveLength(2);

    expect(result.current.filteredEvents).toEqual([
      {
        id: '12eqdw',
        title: '팀 회의',
        date: '2024-10-31',
        startTime: '10:00',
        endTime: '11:00',
        description: '주간 팀 미팅',
        location: '회의실 A',
        category: '업무',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 1,
      },
      {
        id: 'erfg',
        title: '점심 약속',
        date: '2024-11-01',
        startTime: '12:30',
        endTime: '13:30',
        description: '동료와 점심 식사',
        location: '회사 근처 식당',
        category: '개인',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 1,
      },
    ]);
  });

  it('view가 month일 때 현재 월의 모든 이벤트를 반환해야 한다', () => {
    const currentDate = new Date('2024-11-01');
    const view = 'month';
    const { result } = renderHook(() => useSearch(events, currentDate, view));

    expect(result.current.filteredEvents).toHaveLength(4);
    expect(result.current.filteredEvents).toEqual([
      {
        id: 'erfg',
        title: '점심 약속',
        date: '2024-11-01',
        startTime: '12:30',
        endTime: '13:30',
        description: '동료와 점심 식사',
        location: '회사 근처 식당',
        category: '개인',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 1,
      },
      {
        id: 'yhb',
        title: '팀 회의',
        date: '2024-11-05',
        startTime: '09:00',
        endTime: '18:00',
        description: '주간 팀 미팅',
        location: '사무실',
        category: '업무',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 1,
      },
      {
        id: 'a',
        title: '생일 파티',
        date: '2024-11-08',
        startTime: '19:00',
        endTime: '22:00',
        description: '친구 생일 축하',
        location: '친구 집',
        category: '개인',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 1,
      },
      {
        id: 'b',
        title: '팀 회의',
        date: '2024-11-29',
        startTime: '18:00',
        endTime: '19:00',
        description: '주간 팀 미팅',
        location: '헬스장',
        category: '개인',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 1,
      },
    ]);
  });
});

describe('검색어가 있을 때', () => {
  it('view가 week일 때 현재 주의 모든 이벤트를 반환해야 한다', () => {
    const currentDate = new Date('2024-11-01');
    const view = 'week';
    const { result } = renderHook(() => useSearch(events, currentDate, view));

    act(() => {
      result.current.setSearchTerm('회의');
    });

    expect(result.current.filteredEvents).toHaveLength(1);
    expect(result.current.filteredEvents).toEqual([
      {
        id: '12eqdw',
        title: '팀 회의',
        date: '2024-10-31',
        startTime: '10:00',
        endTime: '11:00',
        description: '주간 팀 미팅',
        location: '회의실 A',
        category: '업무',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 1,
      },
    ]);
  });

  it('view가 month일 때 현재 월의 모든 이벤트를 반환해야 한다', () => {
    const currentDate = new Date('2024-11-01');
    const view = 'month';
    const { result } = renderHook(() => useSearch(events, currentDate, view));

    act(() => {
      result.current.setSearchTerm('회의');
    });

    expect(result.current.filteredEvents).toHaveLength(2);
    expect(result.current.filteredEvents).toEqual([
      {
        id: 'yhb',
        title: '팀 회의',
        date: '2024-11-05',
        startTime: '09:00',
        endTime: '18:00',
        description: '주간 팀 미팅',
        location: '사무실',
        category: '업무',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 1,
      },
      {
        id: 'b',
        title: '팀 회의',
        date: '2024-11-29',
        startTime: '18:00',
        endTime: '19:00',
        description: '주간 팀 미팅',
        location: '헬스장',
        category: '개인',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 1,
      },
    ]);
  });

  it("검색어를 '회의'에서 '점심'으로 변경하면 필터링된 결과가 즉시 업데이트되어야 한다", () => {
    const currentDate = new Date('2024-11-01');
    const view = 'month';
    const { result } = renderHook(() => useSearch(events, currentDate, view));

    act(() => {
      result.current.setSearchTerm('회의');
    });

    expect(result.current.filteredEvents).toHaveLength(2);
    expect(result.current.filteredEvents).toEqual([
      {
        id: 'yhb',
        title: '팀 회의',
        date: '2024-11-05',
        startTime: '09:00',
        endTime: '18:00',
        description: '주간 팀 미팅',
        location: '사무실',
        category: '업무',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 1,
      },
      {
        id: 'b',
        title: '팀 회의',
        date: '2024-11-29',
        startTime: '18:00',
        endTime: '19:00',
        description: '주간 팀 미팅',
        location: '헬스장',
        category: '개인',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 1,
      },
    ]);

    act(() => {
      result.current.setSearchTerm('점심');
    });

    expect(result.current.filteredEvents).toHaveLength(1);
    expect(result.current.filteredEvents).toEqual([
      {
        id: 'erfg',
        title: '점심 약속',
        date: '2024-11-01',
        startTime: '12:30',
        endTime: '13:30',
        description: '동료와 점심 식사',
        location: '회사 근처 식당',
        category: '개인',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 1,
      },
    ]);
  });

  it('검색어가 제목, 설명, 위치 중 하나라도 일치하면 해당 이벤트를 반환해야 한다', () => {
    const currentDate = new Date('2024-11-01');
    const view = 'month';
    const { result } = renderHook(() => useSearch(events, currentDate, view));

    act(() => {
      result.current.setSearchTerm('식당');
    });

    expect(result.current.filteredEvents).toHaveLength(1);
    expect(result.current.filteredEvents).toEqual([
      {
        id: 'erfg',
        title: '점심 약속',
        date: '2024-11-01',
        startTime: '12:30',
        endTime: '13:30',
        description: '동료와 점심 식사',
        location: '회사 근처 식당',
        category: '개인',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 1,
      },
    ]);
  });
});
