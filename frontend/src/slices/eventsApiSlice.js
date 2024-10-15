import { EVENTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const eventsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEvents: builder.query({
            query: ({ keyword, pageNumber }) => ({
                url: EVENTS_URL,
                params: { keyword, pageNumber },
              }),
              keepUnusedDataFor: 5,
              providesTags: ['Event'],
        }),
        getEventDetails : builder.query({
            query: (eventId) => ({
                url:  `${EVENTS_URL}/${eventId}`
            }),
            keepUnusedDataFor: 5
        }),

        createEvent: builder.mutation({
            query: () => ({
                url: EVENTS_URL,
                method: "POST",
                providesTags: ["Event"],
            }),
            invalidatesTags: ["Event"]
        }),

        updateEvent: builder.mutation({
            query: (data) => ({
                url: `${EVENTS_URL}/${data._id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ['Event']
        }),

        uploadEventImage: builder.mutation({
            query : (data) => ({
                url: `${UPLOAD_URL}`,
                method: "POST",
                body: data
            }),
        }),

        deleteEvent: builder.mutation({
            query: (eventId) => ({
                url: `${EVENTS_URL}/${eventId}`,
                method: "DELETE"
            })
        }),

        createReview : builder.mutation({
            query: (data) => ({
                url : `${EVENTS_URL}/${data.eventId}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Event']
        }),
        getTopEvents : builder.query({
            query: () => ({
                url : `${EVENTS_URL}/top`,
            }),
            keepUnusedDataFor:5,
        })

    }),
})


export const { useGetEventsQuery, useGetEventDetailsQuery, useCreateEventMutation, useUpdateEventMutation, useUploadEventImageMutation, useDeleteEventMutation, useCreateReviewMutation, useGetTopEventsQuery } = eventsApiSlice;