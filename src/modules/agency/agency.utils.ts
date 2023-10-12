export const getPlanByRoleQuery = (user: any, queryOption: any) => {
  if (user?.role === 'agency') {
    const queries = {
      where: {
        agency_id: user.userId,
        ...queryOption,
      },
      include: {
        booking_history: true,
      },
    };
    console.log(queries);
    return queries;
  }
  if (!user?.role || user?.role === 'user') {
    const queries = {
      where: {
        ...queryOption,
      },
      select: {
        plan_name: true,
        id: true,
        starting_location: true,
        price: true,
        cover_location: true,
        tour_duration: true,
        starting_time: true,
        total_meals: true,
        description: true,
        booking_deadline: true,
        events: true,
        users: {
          select: {
            first_name: true,
            last_name: true,
            contact_no: true,
            id: true,
          },
        },
      },
    };
    return queries;
  }
};
