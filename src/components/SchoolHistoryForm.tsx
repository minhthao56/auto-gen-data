import { Checkbox, Container, Input, Progress, Text } from "@nextui-org/react";
import { Control, Controller, UseFormWatch, useWatch } from "react-hook-form";
import { FormConfigGenerationFormProps } from "./FormConfigGeneration ";

export interface SchoolHistoryFormProps {
  control: Control<FormConfigGenerationFormProps, any>;
}

export default function SchoolHistoryForm({ control }: SchoolHistoryFormProps) {
  const hasSchoolHistory = useWatch({ control, name: "hasSchoolHistory" });

  return (
    <>
      <Container css={{ py: 8 }}>
        <Progress size={"xs"} value={100} />
      </Container>
      <Container css={{ px: 0 }}>
        <Controller
          name="hasSchoolHistory"
          control={control}
          render={({ field: { onChange } }) => {
            return (
              <Checkbox
                onChange={onChange}
                css={{ marginBottom: 8 }}
                label={"School History (check if you want to add)"}
              />
            );
          }}
        />
        <Container>
          <Controller
            name="school"
            control={control}
            rules={{
              required: {
                value: hasSchoolHistory,
                message:
                  "School Partner ID is required if you want to add school history",
              },
            }}
            render={({ field: { onChange }, fieldState: { error } }) => {
              return (
                <Input
                  placeholder="School Partner ID"
                  onChange={onChange}
                  disabled={!hasSchoolHistory}
                  css={{ mr: 32 }}
                  helperColor={error?.message ? "error" : "default"}
                  helperText={error?.message}
                  width={"300px"}
                />
              );
            }}
          />

          <Controller
            name="schoolCourse"
            control={control}
            render={({ field: { onChange } }) => {
              return (
                <Input
                  placeholder="School Course Partner ID"
                  onChange={onChange}
                  disabled={!hasSchoolHistory}
                  css={{ mr: 32 }}
                  width={"300px"}
                />
              );
            }}
          />
          <Controller
            name="hasEndDateStartDate"
            control={control}
            render={({ field: { onChange } }) => {
              return (
                <Checkbox
                  onChange={onChange}
                  isDisabled={!hasSchoolHistory}
                  css={{ mr: 32 }}
                >
                  <Text>Generation start - end date</Text>
                </Checkbox>
              );
            }}
          />
        </Container>
      </Container>
    </>
  );
}
