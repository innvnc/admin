'use client';

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addToast } from '@heroui/react';

import { UI } from '@/components/shared';
import { Icons } from '@/components/shared/ui';
import { useAddCourseSection, useUpdateCourseSection, useGetCourseSection } from '../../hooks';
import { CreateSectionInputs, createSectionSchema } from '../../validators';


interface Props {
    id?: string;
    courseId: string;
    onClose: () => void;
}

export const CourseSectionForm = ({ id, courseId, onClose }: Props) => {
    const { addNewCourseSection } = useAddCourseSection();
    const { updateSection } = useUpdateCourseSection();
    const { courseSection } = useGetCourseSection(id || '');

    const form = useForm<CreateSectionInputs>({
        defaultValues: {
            title: '',
            description: '',
            slug: '',
            courseId
        },
        resolver: zodResolver(createSectionSchema),
    });

    useEffect(() => {
        if (id && courseSection) {
            form.reset({
                title: courseSection.title,
                description: courseSection.description,
                slug: courseSection.slug,
                courseId
            });
        }
    }, [id, courseSection, form, courseId]);

    const onSubmit = async (data: CreateSectionInputs) => {
        try {
            if (id) {
                await updateSection(id, {
                    title: data.title,
                    description: data.description,
                    slug: data.slug,
                    courseId
                });
            } else {
                await addNewCourseSection({
                    title: data.title,
                    description: data.description,
                    slug: data.slug,
                    courseId
                });
            }

            addToast({
                title: 'Éxito',
                description: id
                    ? `La sección "${data.title}" se ha actualizado correctamente.`
                    : `La sección "${data.title}" se ha creado correctamente.`,
                color: 'success',
            });

            onClose();
        } catch (error) {
            addToast({
                title: 'Error',
                description: `Hubo un problema al guardar la sección.`,
                color: 'danger',
            });
        }
    };

    const handleTitleChange = (value: string) => {
        form.setValue('title', value);

        if (!id) {
            const slug = value
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9\s]/g, '')
                .replace(/\s+/g, '-');

            form.setValue('slug', slug);
        }
    };

    return (
        <UI.Form id="section-form" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
                <Controller
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <UI.Input
                            value={field.value}
                            errorMessage={form.formState.errors.title?.message}
                            isInvalid={Boolean(form.formState.errors.title)}
                            label="Título"
                            labelPlacement="outside"
                            placeholder="Ingresa un título"
                            onValueChange={handleTitleChange}
                        />
                    )}
                />

                <Controller
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <UI.Textarea
                            value={field.value}
                            errorMessage={form.formState.errors.description?.message}
                            isInvalid={Boolean(form.formState.errors.description)}
                            label="Descripción"
                            labelPlacement="outside"
                            placeholder="Ingresa una descripción"
                            onValueChange={(value) => form.setValue('description', value)}
                        />
                    )}
                />

                <Controller
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <UI.Input
                            value={field.value}
                            errorMessage={form.formState.errors.slug?.message}
                            isInvalid={Boolean(form.formState.errors.slug)}
                            label="Slug"
                            labelPlacement="outside"
                            placeholder="slug-de-la-seccion"
                            startContent={<Icons.IoLinkOutline className="text-default-400" size={16} />}
                            onValueChange={(value) => form.setValue('slug', value)}
                        />
                    )}
                />
            </div>
        </UI.Form>
    );
};