const [optimisticSections, updateOptimisticSections] = useOptimistic<SectionScheme[], SectionScheme>(
    contextSections || [],
    (currentState, updatedSection) => {
        return [...currentState, updatedSection];
    }
);