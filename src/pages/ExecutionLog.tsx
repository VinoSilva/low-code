// Import libraries
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

// Import components
import StyledTable from "@components/shared/Table";
import Loading from "@components/shared/Loading";

// Import constants
import { QUERY } from "@constants/query";

// Import services
import { fetchLogs } from "@services/log.service";

import { useCallback, useMemo } from "react";

const Container = styled.div`
  padding: 20px;
  padding-top: 0px;
  padding-left: 80px;
  padding-right: 80px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

const SubTitle = styled.p`
  font-size: 20px;
  color: ${(props) => props.theme.colors.grey.main};
`;

const TableContainer = styled.div`
  margin-top: 40px;
`;

const ExecutionLog = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [QUERY.LOGS.FETCH],
    queryFn: () => fetchLogs(),
  });

  const isLogsLoading = useMemo(() => {
    return isFetching || isLoading;
  }, [isFetching, isLoading]);

  const renderLogs = useCallback(() => {
    if (!data?.data?.length) {
      return <></>;
    }

    return data.data.map(
      ({ logId, timestamp, status, nodeType, output, inputs }) => (
        <tr key={logId}>
          <td>
            {new Date(timestamp).toLocaleDateString("en-GB", {
              minute: "numeric",
              second: "numeric",
              hour: "numeric",
            })}
          </td>
          <td>{nodeType}</td>
          <td>{JSON.stringify(inputs)}</td>
          <td>{output}</td>
          <td>{status}</td>
        </tr>
      )
    );
  }, [data]);

  return (
    <Container>
      <Title>Execution Log</Title>
      <SubTitle>
        Monitor your task executions made in your project with the execution
        logs.
      </SubTitle>
      <TableContainer>
        {isLogsLoading ? (
          <Loading />
        ) : (
          <StyledTable>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Node Type</th>
                <th>Inputs</th>
                <th>Outputs</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{renderLogs()}</tbody>
          </StyledTable>
        )}
      </TableContainer>
    </Container>
  );
};

export default ExecutionLog;
