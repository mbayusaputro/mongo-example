module.exports.chatHistories = {
  _id: 0,
  Created: '$userChats.createdAt',
  Company: '$personalUserCompany',
  User: '$name',
  Email: 1,
  Question: '$userChats.question',
  Answer: '$userChats.answer',
  Dislike: {
    $cond: {
      if: {
        $eq: ['$userChats.downvote', true],
      },
      then: 'Yes',
      else: 'No',
    },
  },
  Like: {
    $cond: {
      if: {
        $eq: ['$userChats.upvote', true],
      },
      then: 'Yes',
      else: 'No',
    },
  },
  "Additional Feedback": {
    "$cond": {
      "if": { "$ne": ["$userChats.description", null] },
      "then": "$userChats.description",
      "else": "N/A"
    }
  },
  'Factually Correct': {
    $cond: {
      if: {
        $gt: [
          {
            $size: {
              $filter: {
                input: {
                  $ifNull: ['$userChats.ratingtype', []],
                },
                as: 'rate',
                cond: {
                  $eq: ['$$rate.name', 'Factually Correct'],
                },
              },
            },
          },
          0,
        ],
      },
      then: 'Yes',
      else: 'No',
    },
  },
  'Easy to understand': {
    $cond: {
      if: {
        $gt: [
          {
            $size: {
              $filter: {
                input: {
                  $ifNull: ['$userChats.ratingtype', []],
                },
                as: 'rate',
                cond: {
                  $eq: ['$$rate.name', 'Easy to understand'],
                },
              },
            },
          },
          0,
        ],
      },
      then: 'Yes',
      else: 'No',
    },
  },
  'Informative': {
    $cond: {
      if: {
        $gt: [
          {
            $size: {
              $filter: {
                input: {
                  $ifNull: ['$userChats.ratingtype', []],
                },
                as: 'rate',
                cond: {
                  $eq: ['$$rate.name', 'Informative'],
                },
              },
            },
          },
          0,
        ],
      },
      then: 'Yes',
      else: 'No',
    },
  },
  'Creative/Interesting': {
    $cond: {
      if: {
        $gt: [
          {
            $size: {
              $filter: {
                input: {
                  $ifNull: ['$userChats.ratingtype', []],
                },
                as: 'rate',
                cond: {
                  $eq: ['$$rate.name', 'Creative/Interesting'],
                },
              },
            },
          },
          0,
        ],
      },
      then: 'Yes',
      else: 'No',
    },
  },
  'Well Formatted': {
    $cond: {
      if: {
        $gt: [
          {
            $size: {
              $filter: {
                input: {
                  $ifNull: ['$userChats.ratingtype', []],
                },
                as: 'rate',
                cond: {
                  $eq: ['$$rate.name', 'Well Formatted'],
                },
              },
            },
          },
          0,
        ],
      },
      then: 'Yes',
      else: 'No',
    },
  },
  Other: {
    $cond: {
      if: {
        $gt: [
          {
            $size: {
              $filter: {
                input: {
                  $ifNull: ['$userChats.ratingtype', []],
                },
                as: 'rate',
                cond: {
                  $eq: ['$$rate.name', 'Other'],
                },
              },
            },
          },
          0,
        ],
      },
      then: 'Yes',
      else: 'No',
    },
  },
  'Offensive/Unsafe': {
    $cond: {
      if: {
        $gt: [
          {
            $size: {
              $filter: {
                input: {
                  $ifNull: ['$userChats.ratingtype', []],
                },
                as: 'rate',
                cond: {
                  $eq: ['$$rate.name', 'Offensive/Unsafe'],
                },
              },
            },
          },
          0,
        ],
      },
      then: 'Yes',
      else: 'No',
    },
  },
  'Not factually correct': {
    $cond: {
      if: {
        $gt: [
          {
            $size: {
              $filter: {
                input: {
                  $ifNull: ['$userChats.ratingtype', []],
                },
                as: 'rate',
                cond: {
                  $eq: ['$$rate.name', 'Not factually correct'],
                },
              },
            },
          },
          0,
        ],
      },
      then: 'Yes',
      else: 'No',
    },
  },
  "Didn't follow instruction": {
    $cond: {
      if: {
        $gt: [
          {
            $size: {
              $filter: {
                input: {
                  $ifNull: ['$userChats.ratingtype', []],
                },
                as: 'rate',
                cond: {
                  $eq: ['$$rate.name', "Didn't follow instruction"],
                },
              },
            },
          },
          0,
        ],
      },
      then: 'Yes',
      else: 'No',
    },
  },
  'Wrong language': {
    $cond: {
      if: {
        $gt: [
          {
            $size: {
              $filter: {
                input: {
                  $ifNull: ['$userChats.ratingtype', []],
                },
                as: 'rate',
                cond: {
                  $eq: ['$$rate.name', 'Wrong language'],
                },
              },
            },
          },
          0,
        ],
      },
      then: 'Yes',
      else: 'No',
    },
  },
  'Poorly formatted': {
    $cond: {
      if: {
        $gt: [
          {
            $size: {
              $filter: {
                input: {
                  $ifNull: ['$userChats.ratingtype', []],
                },
                as: 'rate',
                cond: {
                  $eq: ['$$rate.name', 'Poorly formatted'],
                },
              },
            },
          },
          0,
        ],
      },
      then: 'Yes',
      else: 'No',
    },
  },
  'Generic/Blend': {
    $cond: {
      if: {
        $gt: [
          {
            $size: {
              $filter: {
                input: {
                  $ifNull: ['$userChats.ratingtype', []],
                },
                as: 'rate',
                cond: {
                  $eq: ['$$rate.name', 'Generic/Blend'],
                },
              },
            },
          },
          0,
        ],
      },
      then: 'Yes',
      else: 'No',
    },
  },
};

module.exports.summary = {
  _id: 0,
  User: '$name',
  Email: 1,
  Company: '$personalUserCompany',
  "Q&A": {
    $size: '$userChats',
  },
  Like: {
    $size: {
      $filter: {
        input: '$userChats',
        as: 'chat',
        cond: {
          $eq: ['$$chat.upvote', true],
        },
      },
    },
  },
  Dislike: {
    $size: {
      $filter: {
        input: '$userChats',
        as: 'chat',
        cond: {
          $eq: ['$$chat.downvote', true],
        },
      },
    },
  },
  'Factually Correct': {
    $sum: {
      $map: {
        input: '$userChats',
        as: 'chat',
        in: {
          $size: {
            $filter: {
              input: {
                $ifNull: ['$$chat.ratingtype', []],
              },
              as: 'rate',
              cond: {
                $eq: ['$$rate.name', 'Factually Correct'],
              },
            },
          },
        },
      },
    },
  },
  'Easy to understand': {
    $sum: {
      $map: {
        input: '$userChats',
        as: 'chat',
        in: {
          $size: {
            $filter: {
              input: {
                $ifNull: ['$$chat.ratingtype', []],
              },
              as: 'rate',
              cond: {
                $eq: ['$$rate.name', 'Easy to understand'],
              },
            },
          },
        },
      },
    },
  },
  'Informative': {
    $sum: {
      $map: {
        input: '$userChats',
        as: 'chat',
        in: {
          $size: {
            $filter: {
              input: {
                $ifNull: ['$$chat.ratingtype', []],
              },
              as: 'rate',
              cond: {
                $eq: ['$$rate.name', 'Informative'],
              },
            },
          },
        },
      },
    },
  },
  'Creative/Interesting': {
    $sum: {
      $map: {
        input: '$userChats',
        as: 'chat',
        in: {
          $size: {
            $filter: {
              input: {
                $ifNull: ['$$chat.ratingtype', []],
              },
              as: 'rate',
              cond: {
                $eq: ['$$rate.name', 'Creative/Interesting'],
              },
            },
          },
        },
      },
    },
  },
  'Well Formatted': {
    $sum: {
      $map: {
        input: '$userChats',
        as: 'chat',
        in: {
          $size: {
            $filter: {
              input: {
                $ifNull: ['$$chat.ratingtype', []],
              },
              as: 'rate',
              cond: {
                $eq: ['$$rate.name', 'Well Formatted'],
              },
            },
          },
        },
      },
    },
  },
  'Other': {
    $sum: {
      $map: {
        input: '$userChats',
        as: 'chat',
        in: {
          $size: {
            $filter: {
              input: {
                $ifNull: ['$$chat.ratingtype', []],
              },
              as: 'rate',
              cond: {
                $eq: ['$$rate.name', 'Other'],
              },
            },
          },
        },
      },
    },
  },
  'Offensive/Unsafe': {
    $sum: {
      $map: {
        input: '$userChats',
        as: 'chat',
        in: {
          $size: {
            $filter: {
              input: {
                $ifNull: ['$$chat.ratingtype', []],
              },
              as: 'rate',
              cond: {
                $eq: ['$$rate.name', 'Offensive/Unsafe'],
              },
            },
          },
        },
      },
    },
  },
  'Not factually correct': {
    $sum: {
      $map: {
        input: '$userChats',
        as: 'chat',
        in: {
          $size: {
            $filter: {
              input: {
                $ifNull: ['$$chat.ratingtype', []],
              },
              as: 'rate',
              cond: {
                $eq: ['$$rate.name', 'Not factually correct'],
              },
            },
          },
        },
      },
    },
  },
  "Didn't follow instruction": {
    $sum: {
      $map: {
        input: '$userChats',
        as: 'chat',
        in: {
          $size: {
            $filter: {
              input: {
                $ifNull: ['$$chat.ratingtype', []],
              },
              as: 'rate',
              cond: {
                $eq: ['$$rate.name', "Didn't follow instruction"],
              },
            },
          },
        },
      },
    },
  },
  "Wrong Language": {
    $sum: {
      $map: {
        input: '$userChats',
        as: 'chat',
        in: {
          $size: {
            $filter: {
              input: {
                $ifNull: ['$$chat.ratingtype', []],
              },
              as: 'rate',
              cond: {
                $eq: ['$$rate.name', 'Wrong language'],
              },
            },
          },
        },
      },
    },
  },
  'Poorly formatted': {
    $sum: {
      $map: {
        input: '$userChats',
        as: 'chat',
        in: {
          $size: {
            $filter: {
              input: {
                $ifNull: ['$$chat.ratingtype', []],
              },
              as: 'rate',
              cond: {
                $eq: ['$$rate.name', 'Poorly formatted'],
              },
            },
          },
        },
      },
    },
  },
  'Generic/Blend': {
    $sum: {
      $map: {
        input: '$userChats',
        as: 'chat',
        in: {
          $size: {
            $filter: {
              input: {
                $ifNull: ['$$chat.ratingtype', []],
              },
              as: 'rate',
              cond: {
                $eq: ['$$rate.name', 'Generic/Blend'],
              },
            },
          },
        },
      },
    },
  },
};