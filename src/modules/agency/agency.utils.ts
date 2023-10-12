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
        starting_time: true,
        price: true,
        users: {
          select: {
            first_name: true,
            last_name: true,
            id: true,
          },
        },
      },
    };
    return queries;
  }
};
