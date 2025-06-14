import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Table, Input, Typography, Space, Tag, App } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import './BDHomepageAntd.css';

const { Title, Text } = Typography;

const BDHomepage = () => {
  const [bds, setBds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 50,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} BDs`,
  });
  const [sortInfo, setSortInfo] = useState({});

  const API_BASE_URL = 'http://localhost:8000';

  // Column definitions
  const columns = useMemo(() => [
    {
      title: 'Cote',
      dataIndex: 'cote',
      key: 'cote',
      width: 120,
      sorter: true,
      render: (text) => (
        <Tag color="blue" style={{ fontFamily: 'monospace', fontSize: '12px' }}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Série',
      dataIndex: 'titreserie',
      key: 'titreserie',
      width: 200,
      sorter: true,
      render: (text) => text || <Text type="secondary">-</Text>,
      ellipsis: true,
    },
    {
      title: 'Titre Album',
      dataIndex: 'titrealbum',
      key: 'titrealbum',
      width: 250,
      sorter: true,
      render: (text) => (
        <Text strong>{text || 'Album sans titre'}</Text>
      ),
      ellipsis: true,
    },
    {
      title: 'Tome',
      dataIndex: 'numtome',
      key: 'numtome',
      width: 80,
      sorter: true,
      align: 'center',
      render: (text) => text ? (
        <Tag color="red" style={{ fontWeight: 'bold' }}>{text}</Tag>
      ) : <Text type="secondary">-</Text>,
    },
    {
      title: 'Scénariste',
      dataIndex: 'scenariste',
      key: 'scenariste',
      width: 180,
      sorter: true,
      ellipsis: true,
    },
    {
      title: 'Dessinateur',
      dataIndex: 'dessinateur',
      key: 'dessinateur',
      width: 180,
      sorter: true,
      ellipsis: true,
    },
    {
      title: 'Éditeur',
      dataIndex: 'editeur',
      key: 'editeur',
      width: 150,
      sorter: true,
      render: (text) => text || <Text type="secondary">-</Text>,
      ellipsis: true,
    },
    {
      title: 'Collection',
      dataIndex: 'collection',
      key: 'collection',
      width: 140,
      sorter: true,
      render: (text) => text || <Text type="secondary">-</Text>,
      ellipsis: true,
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
      width: 120,
      sorter: true,
      render: (text) => text ? (
        <Tag color="green">{text}</Tag>
      ) : <Text type="secondary">-</Text>,
      ellipsis: true,
    },
  ], []);

  // Fetch total count
  const fetchTotalCount = useCallback(async (search = '') => {
    try {
      const params = {};
      if (search && search.trim()) {
        params.search = search.trim();
      }
      
      const response = await axios.get(`${API_BASE_URL}/bds/count`, { params });
      return response.data.total || 0;
    } catch (error) {
      console.error('Error fetching total count:', error);
      return 0;
    }
  }, []);

  // Fetch BDs from API
  const fetchBDs = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const {
        current = 1,
        pageSize = 50,
        search = searchTerm,
        sortField,
        sortOrder
      } = params;

      const requestParams = {
        skip: (current - 1) * pageSize,
        limit: pageSize,
      };

      if (search && search.trim()) {
        requestParams.search = search.trim();
      }

      if (sortField) {
        requestParams.sort_field = sortField;
        requestParams.sort_order = sortOrder === 'ascend' ? 'asc' : 'desc';
      }

      // Fetch both data and total count
      const [dataResponse, totalCount] = await Promise.all([
        axios.get(`${API_BASE_URL}/bds/`, { params: requestParams }),
        fetchTotalCount(search)
      ]);

      const data = dataResponse.data || [];
      
      setBds(data);
      
      setPagination(prev => ({
        ...prev,
        current,
        pageSize,
        total: totalCount,
      }));

    } catch (error) {
      console.error('Error fetching BDs:', error);
      setBds([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, fetchTotalCount]);

  // Initial load
  useEffect(() => {
    fetchBDs({ current: 1, pageSize: 50 });
  }, []);

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchBDs({ 
        current: 1, 
        pageSize: pagination.pageSize,
        search: searchTerm,
        ...sortInfo
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, fetchBDs, pagination.pageSize, sortInfo]);

  // Handle table changes (pagination, sorting)
  const handleTableChange = (paginationInfo, filters, sorter) => {
    const newSortInfo = {};
    if (sorter.field) {
      newSortInfo.sortField = sorter.field;
      newSortInfo.sortOrder = sorter.order;
    }
    
    setSortInfo(newSortInfo);
    
    fetchBDs({
      current: paginationInfo.current,
      pageSize: paginationInfo.pageSize,
      search: searchTerm,
      ...newSortInfo
    });
  };

  return (
    <div className="bd-homepage-antd">
      <div className="bd-header-antd">
        <Title level={1} className="bd-main-title">
          Bibliothèque BD
        </Title>
        <Text className="bd-subtitle">
          Découvrez notre collection de bandes dessinées
        </Text>
        
        <Space.Compact size="large" className="search-container">
          <Input
            placeholder="Rechercher par titre, auteur, série..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
            size="large"
            style={{ width: 400 }}
          />
        </Space.Compact>
      </div>

      <div className="bd-content-antd">
        <Table
          columns={columns}
          dataSource={bds}
          rowKey="bid"
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{ x: 1200 }}
          size="middle"
          bordered
          className="bd-table-antd"
        />
      </div>
    </div>
  );
};

export default BDHomepage;
