export const percentageChartProps = {
  chartTitle: 'Percentage chart',
  percentageMap: {
    kevin: 0.12,
    gabby: 0.34,
    brook: 0.31
  }
};

export const ratingsChartProps = {
  chartTitle: 'Ratings chart',
  labels: [
    'Chang',
    'Mei',
  ],
  dataPoints: [{
    groupKey: 'Chang',
    swipeCount: 630,
    swipeRightPercent: 0.43,
    ratings: [
      { ratingValue: '0', percentage: 0.40 },
      { ratingValue: '1', percentage: 0.20 },
      { ratingValue: '2', percentage: 0.30 }
    ]
  }, {
    groupKey: 'Mei',
    swipeCount: 462,
    swipeRightPercent: 0.73,
    ratings: [
      { ratingValue: '0', percentage: 0.70 },
      { ratingValue: '1', percentage: 0.10 },
      { ratingValue: '2', percentage: 0.20 }
    ]
  }]
};