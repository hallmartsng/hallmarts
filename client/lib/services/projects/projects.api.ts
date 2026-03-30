'use client';
import { CreateProjectRequest, Project } from '@/types/projects.types';
import { api } from '../api';
import { ApiResponse } from '@/types/api.types';

export const projectsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation<
      ApiResponse<CreateProjectRequest>, // Response
      CreateProjectRequest // Request body
    >({
      query: (body) => ({
        url: '/admin/projects',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: 'Projects', id: 'LIST' },
        { type: 'Projects', id: 'COUNT' },
        { type: 'Finances', id: 'LIST' },
        { type: 'Finances', id: 'COUNT' },
      ],
    }),
    getAllProjects: builder.query<
      ApiResponse<Project[]>,
      {
        search?: string;
        status?: string;
        phase?: string;
        state?: string;
        startDate?: string;
        assignedTo?: string;
        endDate?: string;
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
      }
    >({
      query: (params) => ({
        url: '/admin/projects',
        method: 'GET',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: 'Projects' as const,
                _id,
              })),
              { type: 'Projects', id: 'LIST' },
            ]
          : [{ type: 'Projects', id: 'LIST' }],
    }),
    updateProject: builder.mutation<
      ApiResponse<null>,
      {
        id: string;
        data: { status?: number; phase?: string; endDate?: string };
      }
    >({
      query: ({ id, data }) => ({
        url: `/supervisors/projects/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Projects', id },
        { type: 'Projects', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
  useUpdateProjectMutation,
} = projectsApi;
