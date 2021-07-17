const DUMMY_EVENTS = [
  {
    demoId: 'e1',
    title: 'Programming for everyone',
    description:
      'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.',
    location: 'Somestreet 25, 12345 San Somewhereo',
    date: '2021-05-12',
    image: 'images/coding-event.jpg',
    isFeatured: 'false',
  },
  {
    demoId: 'e2',
    title: 'Networking for introverts',
    description:
      "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
    location: 'New Wall Street 5, 98765 New Work',
    date: '2021-05-30',
    image: 'images/introvert-event.jpg',
    isFeatured: 'false',
  },
  {
    demoId: 'e3',
    title: 'Networking for extroverts',
    description:
      'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
    location: 'My Street 12, 10115 Broke City',
    date: '2024-07-20',
    image: 'images/extrovert-event.jpg',
    isFeatured: 'true',
  },
  {
    demoId: 'e4',
    title: 'Network engineer',
    description:
      'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
    location: 'My Street 12, 10115 Broke City',
    date: '2022-03-01',
    image: 'images/extrovert-event.jpg',
    isFeatured: 'true',
  },
  {
    demoId: 'e5',
    title: 'Network architect',
    description:
      'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
    location: 'My Street 12, 10115 Broke City',
    date: '2021-11-23',
    image: 'images/coding-event.jpg',
    isFeatured: 'false',
  },
  {
    demoId: 'e6',
    title: 'Network manager',
    description:
      'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
    location: 'My Street 12, 10115 Broke City',
    date: '2023-05-16',
    image: 'images/extrovert-event.jpg',
    isFeatured: 'false',
  },
  {
    demoId: 'e7',
    title: 'Wireless network engineer',
    description:
      'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
    location: 'My Street 12, 10115 Broke City',
    date: '2023-06-06',
    image: 'images/coding-event.jpg',
    isFeatured: 'true',
  },
  {
    demoId: 'e8',
    title: 'Telecommunications manager or specialist',
    description:
      'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
    location: 'My Street 12, 10115 Broke City',
    date: '2024-02-09',
    image: 'images/extrovert-event.jpg',
    isFeatured: 'true',
  },
  {
    demoId: 'e9',
    title: 'Pre-sales engineer',
    description:
      'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
    location: 'My Street 12, 10115 Broke City',
    date: '2023-08-13',
    image: 'images/coding-event.jpg',
    isFeatured: 'false',
  },
  {
    demoId: 'e10',
    title: 'Networking for extroverts',
    description:
      'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
    location: 'My Street 12, 10115 Broke City',
    date: '2021-09-11',
    image: 'images/extrovert-event.jpg',
    isFeatured: 'false',
  },
];

export function getFeaturedEvents() {
  return DUMMY_EVENTS.filter((event) => event.isFeatured);
}

export function getAllEvents() {
  return DUMMY_EVENTS;
}

export function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  let filteredEvents = DUMMY_EVENTS.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}

export function getEventBydemoId(demoId) {
  return DUMMY_EVENTS.find((event) => event.demoId === demoId);
}
