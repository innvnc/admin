'use client';

import { useState, useEffect } from "react";
import { addToast } from '@heroui/react';

import { UI } from '@/components/shared';
import { Icons } from '@/components/shared/ui';
import { useAddCourseSection, useUpdateCourseSection, useGetCourseSection, useGetCourseSectionsByCourseId } from '../../hooks';

interface Props {
    id?: string;
    courseId: string;
    onClose: () => void;
    isSubmitting: boolean;
    setIsSubmitting: (value: boolean) => void;
}

export const CourseSectionForm = ({ id, courseId, onClose, isSubmitting, setIsSubmitting }: Props) => {
    const { addNewCourseSection } = useAddCourseSection();
    const { updateSection } = useUpdateCourseSection();
    const { courseSection } = useGetCourseSection(id || '');
    const { courseSections = [] } = useGetCourseSectionsByCourseId(courseId);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [slug, setSlug] = useState('');
    const [isSlugDuplicate, setIsSlugDuplicate] = useState(false);
    const [errors, setErrors] = useState<{
        title?: string;
        description?: string;
        slug?: string;
    }>({});

    useEffect(() => {
        if (id && courseSection) {
            setTitle(courseSection.title || '');
            setDescription(courseSection.description || '');
            setSlug(courseSection.slug || '');
        }
    }, [courseSection, id]);

    const checkSlugDuplicate = (slug: string) => {
        if (!slug) return false;

        const normalizedSlug = slug.toLowerCase();
        return courseSections
            .filter(section => section.id !== id)
            .some(section => section.slug.toLowerCase() === normalizedSlug);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;

        const newErrors: {
            title?: string;
            description?: string;
            slug?: string;
        } = {};

        if (!title) newErrors.title = "El título es obligatorio";
        if (!description) newErrors.description = "La descripción es obligatoria";
        if (!slug) newErrors.slug = "El slug es obligatorio";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (isSlugDuplicate) {
            addToast({
                title: 'Error',
                description: `El slug "${slug}" ya existe. Por favor, utiliza un slug diferente.`,
                color: 'danger',
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const data = {
                title,
                description,
                slug,
                courseId
            };

            if (id) {
                await updateSection(id, data);
            } else {
                await addNewCourseSection(data);
            }

            addToast({
                title: 'Éxito',
                description: id
                    ? `La sección "${title}" se ha actualizado correctamente.`
                    : `La sección "${title}" se ha creado correctamente.`,
                color: 'success',
            });

            onClose();
        } catch (error) {
            addToast({
                title: 'Error',
                description: `Hubo un problema al guardar la sección.`,
                color: 'danger',
            });
            setIsSubmitting(false);
        }
    };

    const handleTitleChange = (value: string) => {
        setTitle(value);
        setErrors({ ...errors, title: undefined });

        if (!id) {
            const newSlug = value
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9\s]/g, '')
                .replace(/\s+/g, '-');

            setSlug(newSlug);
            const isDuplicate = checkSlugDuplicate(newSlug);
            setIsSlugDuplicate(isDuplicate);
        }
    };

    const handleDescriptionChange = (value: string) => {
        setDescription(value);
        setErrors({ ...errors, description: undefined });
    };

    const handleSlugChange = (value: string) => {
        setSlug(value);
        setErrors({ ...errors, slug: undefined });
        const isDuplicate = checkSlugDuplicate(value);
        setIsSlugDuplicate(isDuplicate);
    };

    return (
        <form id="section-form" onSubmit={handleSubmit} className="w-full">
            <div className="space-y-8 w-full">
                <div>
                    <label className="block text-sm font-medium mb-2">Título</label>
                    <UI.Input
                        value={title}
                        errorMessage={errors.title}
                        isInvalid={!!errors.title}
                        placeholder="Ingresa un título"
                        onValueChange={handleTitleChange}
                        classNames={{
                            base: "w-full",
                            inputWrapper: "w-full"
                        }}
                        fullWidth
                        isDisabled={isSubmitting}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Descripción</label>
                    <UI.Textarea
                        value={description}
                        errorMessage={errors.description}
                        isInvalid={!!errors.description}
                        placeholder="Ingresa una descripción"
                        onValueChange={handleDescriptionChange}
                        classNames={{
                            base: "w-full",
                            inputWrapper: "w-full"
                        }}
                        minRows={3}
                        fullWidth
                        isDisabled={isSubmitting}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Slug</label>
                    <UI.Input
                        value={slug}
                        errorMessage={isSlugDuplicate
                            ? "Este slug ya existe para otra sección en este curso"
                            : errors.slug}
                        isInvalid={isSlugDuplicate || !!errors.slug}
                        placeholder="slug-de-la-seccion"
                        startContent={<Icons.IoLinkOutline className="text-default-400" size={16} />}
                        onValueChange={handleSlugChange}
                        classNames={{
                            base: "w-full",
                            inputWrapper: "w-full"
                        }}
                        fullWidth
                        color={isSlugDuplicate ? "danger" : undefined}
                        isDisabled={isSubmitting}
                    />
                </div>
            </div>
        </form>
    );
};