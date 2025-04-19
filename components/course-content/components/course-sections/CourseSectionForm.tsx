'use client';

import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addToast } from '@heroui/react';

import { UI } from '@/components/shared';
import { Icons } from '@/components/shared/ui';
import { useAddCourseSection, useUpdateCourseSection, useGetCourseSection, useGetCourseSectionsByCourseId } from '../../hooks';
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
    const { courseSections = [] } = useGetCourseSectionsByCourseId(courseId);

    const [isSlugDuplicate, setIsSlugDuplicate] = useState(false);

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
        form.setValue('courseId', courseId);
    }, [courseId, form]);


    useEffect(() => {
        if (id && courseSection) {
            form.setValue('title', courseSection.title);
            form.setValue('description', courseSection.description);
            form.setValue('slug', courseSection.slug);
        }
    }, [id, courseSection, form]);

    const checkSlugDuplicate = (slug: string) => {
        if (!slug) return false;

        const normalizedSlug = slug.toLowerCase();
        const existingSlugs = courseSections
            .filter(section => section.id !== id) 
            .map(section => section.slug.toLowerCase());

        return existingSlugs.includes(normalizedSlug);
    };

    const onSubmit = async (data: CreateSectionInputs) => {
        if (isSlugDuplicate) {
            addToast({
                title: 'Error',
                description: `El slug "${data.slug}" ya existe. Por favor, utiliza un slug diferente.`,
                color: 'danger',
            });
            return;
        }

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
            setIsSlugDuplicate(checkSlugDuplicate(slug));
        }
    };

    const handleSlugChange = (value: string) => {
        form.setValue('slug', value);
        setIsSlugDuplicate(checkSlugDuplicate(value));
    };

    return (
        <UI.Form id="section-form" onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-6 w-full">
                <Controller
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <UI.Input
                            value={field.value || ''}
                            errorMessage={form.formState.errors.title?.message}
                            isInvalid={Boolean(form.formState.errors.title)}
                            label="Título"
                            labelPlacement="outside"
                            placeholder="Ingresa un título"
                            onValueChange={handleTitleChange}
                            classNames={{
                                base: "w-full",
                                inputWrapper: "w-full"
                            }}
                            fullWidth
                            autoFocus={false}
                        />
                    )}
                />

                <Controller
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <UI.Textarea
                            value={field.value || ''}
                            errorMessage={form.formState.errors.description?.message}
                            isInvalid={Boolean(form.formState.errors.description)}
                            label="Descripción"
                            labelPlacement="outside"
                            placeholder="Ingresa una descripción"
                            onValueChange={(value) => form.setValue('description', value)}
                            classNames={{
                                base: "w-full",
                                inputWrapper: "w-full"
                            }}
                            minRows={3}
                            fullWidth
                            autoFocus={false}
                        />
                    )}
                />

                <Controller
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <UI.Input
                            value={field.value || ''}
                            errorMessage={isSlugDuplicate
                                ? "Este slug ya existe para otra sección en este curso"
                                : form.formState.errors.slug?.message}
                            isInvalid={isSlugDuplicate || Boolean(form.formState.errors.slug)}
                            label="Slug"
                            labelPlacement="outside"
                            placeholder="slug-de-la-seccion"
                            startContent={<Icons.IoLinkOutline className="text-default-400" size={16} />}
                            onValueChange={handleSlugChange}
                            classNames={{
                                base: "w-full",
                                inputWrapper: "w-full"
                            }}
                            fullWidth
                            color={isSlugDuplicate ? "danger" : undefined}
                            autoFocus={false}
                        />
                    )}
                />
            </div>
        </UI.Form>
    );
};